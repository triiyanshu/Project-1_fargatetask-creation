import { ECSClient, RunTaskCommand, waitUntilTasksRunning } from "@aws-sdk/client-ecs";

export const handler = async (event) => {
	console.log(JSON.stringify(event))
	event.Records.forEach(record => {
	    const { body } = record;
	    console.log(body);
	});
	
	const clusterARN = process.env.CLUSTER_ARN
	const ecsClient = new ECSClient({ region: process.env.AWS_REGION });
	const containerName = process.env.CONTAINER_NAME
	const params = {
		cluster: clusterARN,
		taskDefinition: process.env.TASK_DEFINITION_ARN,
		networkConfiguration: {
			awsvpcConfiguration: {
				subnets: process.env.VPC_SUBNETS.split(","),
				assignPublicIp: "DISABLED"
			}
		},
		overrides: {
			containerOverrides: [
				{
					name: containerName,
					// task runtime variables
					environment: [
						{
							name: "PACKAGE_INFO",
							value: event.Records[0].body
						}
					]
				}
			]
		},
		count: 1,
		launchType: "FARGATE"
	}
	
	const command = new RunTaskCommand(params)
	
	var ecsTask = await ecsClient.send(command)
	var taskArn = ecsTask.tasks?.[0].taskArn
    if (typeof taskArn !== "string") {
        throw Error("Task ARN is not defined.")
    }
    var waitECSTask = await waitUntilTasksRunning({"client": ecsClient, "maxWaitTime": 600, "maxDelay": 1, "minDelay": 1}, {"cluster": clusterARN, "tasks": [taskArn]})
    // note: there are multiple waitECSTask states, check the documentation for more about that
    if (waitECSTask.state !== 'SUCCESS') {
        console.log("SUCCESS: " + JSON.stringify(waitECSTask))
    } else {
        console.log("WARNING (task state '" + waitECSTask.state + "'): " + JSON.stringify(waitECSTask))
    }

	return { };
}
