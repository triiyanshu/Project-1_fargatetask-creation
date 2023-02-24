# Use the .NET 7.0 runtime image
FROM mcr.microsoft.com/dotnet/sdk:7.0
ADD /SampleDotNetApp/MyApp /app/MyApp

WORKDIR /SampleDotNetApp

# Copy the myapp to the container
COPY .SampleDotNetApp/MyApp .

# entry point
# ENTRYPOINT ["dotnet", "\bin\Debug\net7.0\MyApp.dll"]