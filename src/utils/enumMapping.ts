// Helper functions to map enum values to readable format

export const mapJobType = (jobType: string) => {
    switch (jobType) {
        case "fulltime":
            return "Full Time";
        case "freelance":
            return "Freelance";
        case "internship":
            return "Internship";
        default:
            return jobType;
    }
};

export const mapJobSpace = (jobSpace: string) => {
    switch (jobSpace) {
        case "remoteworking":
            return "Remote Working";
        case "onoffice":
            return "On Office";
        case "hybrid":
            return "Hybrid";
        default:
            return jobSpace;
    }
};

// Helper function to map CompanySize enum values to readable format
export const mapCompanySize = (companySize: string) => {
    switch (companySize) {
        case "small":
            return "Small";
        case "smallmedium":
            return "Small-Medium";
        case "medium":
            return "Medium";
        case "large":
            return "Large";
        case "enterprise":
            return "Enterprise";
        default:
            return companySize;
    }
};

// Helper function to map CompanyIndustry enum values to readable format
export const mapCompanyIndustry = (industry: string) => {
    switch (industry) {
        case "informationtechnologyandservices":
            return "Information Technology and Services";
        case "financeandbanking":
            return "Finance and Banking";
        case "businessandhr":
            return "Business and HR";
        case "hospitalandhealthcare":
            return "Hospital and HealthCare";
        case "constructionandrealestate":
            return "Construction and Real Estate";
        case "retaillogisticandconsumergoods":
            return "Retail Logistic and Consumer Goods";
        case "educationandresearch":
            return "Education and Research";
        case "manufacturingandengineering":
            return "Manufacturing and Engineering";
        case "mediaandentertainment":
            return "Media and Entertainment";
        case "governmentandnonprofit":
            return "Government and Non-Profit";
        case "others":
            return "Others";
        default:
            return industry; // Return the enum value if no match is found
    }
};
