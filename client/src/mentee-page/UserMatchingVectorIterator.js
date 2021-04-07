//Importing user matching vector
import UserMatchingVector from './UserMatchingVector';

export default class UserMatchingVectorIterator{
    constructor(UserMatchingVector){
        this.UserMatchingVector = UserMatchingVector;
        this.currentPos = 0;
    }

    hasNext = () => {
        return this.currentPos < this.UserMatchingVector.vectorArray.length;
    }

    next = () => {
        if (this.hasNext()){
            let val = this.UserMatchingVector.vectorArray[this.currentPos]
            this.currentPos += 1;
            return val;
        }
        return;
    }

    reset = () => {
        this.currentPos = 0;
    }
}