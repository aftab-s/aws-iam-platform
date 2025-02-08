import {
      IAMClient,
      CreateUserCommand,
      DeleteUserCommand,
      ListUsersCommand,
    } from "@aws-sdk/client-iam";
    import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

    const iamClient = new IAMClient({ region: process.env.AWS_REGION });
    const sesClient = new SESClient({ region: process.env.AWS_REGION });

    // IAM User Management
    export const CreateUser = async (username, password) => {
      const params = {
        UserName: username,
      };

      try {
        const data = await iamClient.send(new CreateUserCommand(params));
        console.log("User created", data);
        // In a real application, you would also handle password creation and storage
        return data;
      } catch (err) {
        console.log("Error", err);
        throw err;
      }
    };

    export const ListUsers = async () => {
      try {
        const data = await iamClient.send(new ListUsersCommand({}));
        console.log("Users", data);
        return data.Users;
      } catch (err) {
        console.log("Error", err);
        throw err;
      }
    };

    export const DeleteUser = async (username) => {
      const params = {
        UserName: username,
      };

      try {
        const data = await iamClient.send(new DeleteUserCommand(params));
        console.log("User deleted", data);
        return data;
      } catch (err) {
        console.log("Error", err);
        throw err;
      }
    };

    // Permission Request Handling (Simplified)
    export const RequestPermission = async (permissionRequest) => {
      // In a real application, this would involve sending an email to the admin
      // and storing the request in a database
      console.log("Permission requested:", permissionRequest);
      // Simulate success
      return Promise.resolve();
    };

    // Email Sending
    export const SendEmail = async (email, subject, body) => {
      const params = {
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Text: {
              Data: body,
            },
          },
          Subject: {
            Data: subject,
          },
        },
        Source: "your-email@example.com", // Replace with your verified email
      };

      try {
        const data = await sesClient.send(new SendEmailCommand(params));
        console.log("Email sent", data);
        return data;
      } catch (err) {
        console.log("Error", err);
        throw err;
      }
    };
