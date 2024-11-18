// environment.prod.ts
export const environment = {
    production: true,
    apiUrls: {
      backService: 'https://api.production-domain.com/back',
      userService: 'https://api.production-domain.com/user',
      OMSService: 'https://api.production-domain.com/oms', // Order Management System
      LMSService: 'https://api.production-domain.com/lms', // Learning Management System
      mailingService: 'https://api.production-domain.com/mailing', // Mailing Service
      CMSService: 'https://api.production-domain.com/cms', // Content Management System
      PMSService: 'https://api.production-domain.com/pms', // Project Management System
      // Add more microservices as needed
    },
  };
  