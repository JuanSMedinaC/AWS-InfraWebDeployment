# AWS-InfraWebDeployment
Web page deployment project for Infrastructure III
* Sebastián Lopez
* Juan Medina
  
Para ejecutar el proyecto usando Amazon Web Services(AWS) será necesario:

1. Entrar al AWS management console, ingresar a servicios y seleccionar CloudFormation.
2. Seleccionar la opción Create Stack.
3. En el menú desplegable seleccionar with new resources.
4. En Specify template elegir la opción para crear el stack desde una plantilla (upload a template file).
5. Seleccionar el archivo de cloudformation, cloudformation.yaml.
6. Asignarle un nombre al stack.
7. Definir la contraseña de la base de datos (RDS).
8. Crear el Stack.
9. Acceder desde el DNS Name del Application Load Balancer(ALB) desde internet.
