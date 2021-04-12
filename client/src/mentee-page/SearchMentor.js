//Importing React and React based modules
import React from 'react';

//Importing Axios for communicating with the server
import Axios from 'axios';

//Importing classes
import UserMatchingVector from './UserMatchingVector'
import UserMatchingVectorIterator from './UserMatchingVectorIterator'

//Importing components
import SelectMentor from './SelectMentor'

export default class SearchMentor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fdmEmail: this.props.fdmEmail,
            topMatches: [],
            reloadContent: this.props.reloadContent
        }
    }

    reloadMenteePage = () => {
        this.state.reloadContent();
    }

    //Function returns true if the response confirms nothing went wrong
    validateResponse = (response) => {
        if (response.data.code === "ECONNREFUSED"){
            alert("API Request Failed: server cannot connect to the database");
            return false;
        }
        return true;
    }

    //Returns an array of objects each containing a mentors fdm id and their user matching vector
    createArrayOfMentors = (arr) =>{
        let arrayOfMentors = [];
        for (let i=0; i<arr.length; i++){
            arrayOfMentors.push({fdmId:arr[i].mentor_id, userMatchingVector: new UserMatchingVector(arr[i])})
        }
        return arrayOfMentors;
    }

    //returns a calculated vector norm for the given vector
    calculateVectorNorm = (vectorIterator) => {
        let sum = 0;
        while (vectorIterator.hasNext()){
          sum += vectorIterator.next();
        }
        vectorIterator.reset();
        return Math.sqrt(sum)
    }

    //Calculates dot product using vector iterators for mentee and mentor
    calculateDotProduct = (menteeVectorIter, mentorVectorIter) => {
        let dotProduct = 0;
        while(menteeVectorIter.hasNext() && mentorVectorIter.hasNext()){           
            dotProduct += (menteeVectorIter.next()*mentorVectorIter.next());
        }
        menteeVectorIter.reset(); mentorVectorIter.reset();
        return dotProduct;
    }

    //Matrix similarity algorithm used to calculate each mentors percentage of match to the mentee
    matrixSimilarity = (fdmId, mentorVector, menteeVector) => {
        return{fdmId, 
            match:((this.calculateDotProduct(menteeVector.Iterator(),mentorVector.Iterator())) / (this.calculateVectorNorm(menteeVector.Iterator())*this.calculateVectorNorm(mentorVector.Iterator())))
        };
    }

    //Simple insertion sort for sorting an array of objects based on key-value pair for match
    insertionSort = (arr) => {
        for (let i = 1; i < arr.length; i++) {
            this.insert(i, arr);
        }
        };
    //Auxiliary function to insertionSort
    insert = (i, arr) => {
        let pivot = arr[i];
        for (let j = i; j > 0; j--) {
            if (pivot.match < arr[j-1].match) {
                arr[j] = pivot;
                return;
            }
            arr[j] = arr[j-1];
            }
        arr[0] = pivot;
        return;
        };

    //Returns a array of objects each representing a distinct mentor's fdmId and their percentage of match for the top 5 matches
    findTopMentors = (menteeVector, arrayOfMentors) =>{
        let topFiveMatches = []
        for (let i=0; i<arrayOfMentors.length; i++){
            let crntMentorMatch = this.matrixSimilarity(arrayOfMentors[i].fdmId, arrayOfMentors[i].userMatchingVector, menteeVector);
            if (i < 5){
                topFiveMatches.push(crntMentorMatch);
                this.insertionSort(topFiveMatches);
                continue;
            }

            if (crntMentorMatch.match > topFiveMatches[4].match){
                topFiveMatches[4] = crntMentorMatch;
                this.insertionSort(topFiveMatches)
            } 
        }
        return topFiveMatches;
    }

    componentWillMount(){
        Axios.get(`http://localhost:3001/api/get/areas-of-improvements/${this.state.fdmEmail}`).then((response) =>{
            if (response.data.length == 0 || !this.validateResponse(response)){
                alert("Error occurred mentee areas of improvement doesn't exist")
            }
            else{
                let menteeAreasOfImprovements = response.data[0];
                //API call to get all the fdm Id and areas of expertise of all mentors with areas of expertise
                Axios.get('http://localhost:3001/api/get/areasOfExpertise/mentors-only').then((response) => {
                    let topMatches = this.findTopMentors(new UserMatchingVector(menteeAreasOfImprovements),this.createArrayOfMentors(response.data));
                    //Using method to get the top mentor matches
                    this.setState({
                        topMatches: topMatches
                    });
                });
                
            }
        });
    }

    render(){
        return(
            <div className="container">
                <h3 style={{width:"100%",textAlign:"center"}}>Your Top 5 Matches</h3>
                {this.state.topMatches.map(match => {
                    return(
                        <SelectMentor key={match.fdmId} reloadMenteePage={this.reloadMenteePage} fdmId={match.fdmId} menteeFdmEmail={this.state.fdmEmail} matchPercentage={match.match}/>
                    )
                })}
            </div>
        )
    }
}

