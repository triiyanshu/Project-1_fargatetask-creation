var packageInfo = Environment.GetEnvironmentVariable("PACKAGE_INFO");
Console.WriteLine($"Demo data: {packageInfo ?? "NULL"}");
Console.WriteLine("Done.");
