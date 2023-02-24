# poc-issuepackagebuilder

SQS:

- Set Default visibility timeout - recommended value is at least 6 times the expected processing duration.
- Set 
- Add event source mapping to trigger a Lambda function when new messages are added.
  - Set batch size to 1 in the EventSourceMapping
	
Lambda function:

- Environment variables:
  - CLUSTER_ARN -> the ECS cluster ARN
  - AWS_REGION -> "eu-west-2"
  - CONTAINER_NAME -> The name of the Docker container image
  - VPC_SUBNETS -> A comma-delimited list of subnet IDs
  - TASK_DEFINITION_ARN -> The ARN of the ECS task definition

ECS Task:

- Configure as a Fargate task (not as a service).
