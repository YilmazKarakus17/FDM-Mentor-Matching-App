//Importing iterator class for UserMatchingVector
import UserMatchingVectorIterator from './UserMatchingVectorIterator'

export default class UserMatchingVector{
    constructor(apiJSONResponse){
        this.vectorArray = this.setUserMatchingVector(apiJSONResponse);
        this.iterator = new UserMatchingVectorIterator(this);
    }

    //Returns a integer representation (i.e. an array of either 1 or 0) for the mentees areas of improvements
    setUserMatchingVector = (apiJSONResponse) =>{
        let vector = []
        //Pushing soft skills
        vector.push(apiJSONResponse.communication);
        vector.push(apiJSONResponse.confidence);
        vector.push(apiJSONResponse.time_management);
        vector.push(apiJSONResponse.teamwork);
        vector.push(apiJSONResponse.leadership);
        vector.push(apiJSONResponse.organisation);
        //Pushing hard skills
        vector.push(apiJSONResponse.cloud_computing);
        vector.push(apiJSONResponse.sales);
        vector.push(apiJSONResponse.recruitment);
        vector.push(apiJSONResponse.marketing);
        vector.push(apiJSONResponse.hr);
        vector.push(apiJSONResponse.finance);
        vector.push(apiJSONResponse.academy);
        vector.push(apiJSONResponse.information_technology);
        vector.push(apiJSONResponse.consultant);
        vector.push(apiJSONResponse.programming);
        vector.push(apiJSONResponse.software_testing);
        vector.push(apiJSONResponse.business_intelligence);
        vector.push(apiJSONResponse.automation);       
        return vector;
    }

    Iterator = () => {
        return this.iterator;
    }
}