// environment.ts
export const environment = {
    production: false,
    apiUrls: {
      backService: 'http://localhost:8081/api/ums',
      userpubService: 'http://localhost:8080/ums/pub/api/v1/auth',
     userConsoleService:'http://localhost:8080/ums/console/api/v1/auth',
      OMSService: 'http://localhost:8083/api', // Order Management System(OMS)
      LMSService: 'http://localhost:8084/api', // Learning Management System(LMS)
      mailingService: 'http://localhost:8085/api', // Mailing Service
      CMSService: 'http://localhost:8086/api', // Content Management System(CMS)
      PMSService: 'http://localhost:8087/api', // Project Management System(PMS)
      // Add more microservices as needed
      //declaration des apis public and console 
      //centralisation et configuration 
    },
  };
  