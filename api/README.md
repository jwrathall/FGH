# Running the Hydration api

This project is based of the base web api project from visual studio

## Notes

### Database
The database is sqllite and can be found in the Database folder, there should be no need to install anythign for the project to run. There is no native UI for it within VS so you'll need a 3rd party app to view the raw data (sqlstudiolite).
Entitframe work migrations were used to scaffold out the model and dbcontext class. It uses a design first instead of code first approach, the table was created along with data prior to scaffolding out the code
```
dotnet ef dbcontext scaffold Name=defaultDatabase Microsoft.EntityFrameworkCore.Sqlite --output-dir Models --context-dir Data --namespace api.Models --context-namespace api.Data --context MovieContext -f --no-onconfiguring
```
The DB connection string is in the appsettings.json file and include in the startup.cs class

### api
There is are no environmental variables so everything is in development mode. This allows for a swagger UI to be used for testing the endpoints and loosely documenting what the api does

## Running
Press the green arrow and launch the api using IIS express. 

## Caveats
The front end is expecting 'https://localhost:7282/api/Inventory', please note the port number. If this changes on your system it will need to be also changed in the front end code.
