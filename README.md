# FDM Mentor Matching App
Through the course of a semester, our team conducted domain analysis, requirements gathering, prototype design, implementation, and testing to develop a mentor matching app tailored to meet FDM's needs and wants.
Our main aim was to streamline the mentor finding process because it can be challenging to find a mentor in a huge organisation such as FDM with thousands of employees, consultants, and alumni. This is done by using a matrix similarity-based algorithm to cut down search time by presenting the mentee with a list of top 5 most suitable mentors that they can pick from.

## The Matching Algorithm
The algorithm uses the mentees "areas of limitation" converts it into a vector, then it converts the "area of expertise" for all mentors into separate vectors and performs matrix similarity to find the top 5 mentors (i.e. 5 mentors with highest similarity rating).

In the clip below the mentee already has a mentor ("John Smith"). 
I then changed the database to remove the mentor, so that when we refreshed the page the system will find that the mentee doesn't already have a mentor and will present a list of top 5 most suitable mentors for that specific mentee, with the most suitable mentor at the top and least suitable at the bottom.

Although the clip is small, you may also be able to see that the mentees "areas of weaknesses" is identical to John Smith's (FDM ID: 1) "areas of expertise", and as a result John Smith was at the top of the list with a 100% similarity rating.
![vino map gif](https://github.com/YilmazKarakus17/Gifs-for-Readme/blob/master/FDM%20Mentor%20Matching%20App%20Gifs/Match%202.gif)

## The Mentor Filter
Our team decided FDM would want a filtering mechanism because not everyone is suitable to be an FDM mentor, therefore if a user wishes to become a mentor, they will first need to have a FDM recognised ID and secondly will need to fill out an application which the technicians look over and if they deem the applicant is authorised to become a mentor they will generate an account for them, else they will decline the application.

In the clip below, I use one browser (brave) to apply as a mentor and another browser (google chrome) to sign in as a technician.

Once I apply, a application entry is created in the database and the technicians are able to view the details of my application. In the clip I decided to approve the application by pressing the generate button.

If the `generate button` is pressed the applicant will receive an email informing them that they have been approved and a mentor account is generated.
If the `decline button` is pressed the applicant will receive an email informing them their application was decline and the application entry is deleted from the database.

![vino map gif](https://github.com/YilmazKarakus17/Gifs-for-Readme/blob/master/FDM%20Mentor%20Matching%20App%20Gifs/Filtering%20Mentor%20Applications.gif)

## Responsiveness
Bootstrap and CSS was used to make the app responsive to all devices. The below clip shows the app's responsiveness from desktops to mobile devices because they are at opposite ends of the spectrum in terms of device screen sizes.
![vino map gif](https://github.com/YilmazKarakus17/Gifs-for-Readme/blob/master/FDM%20Mentor%20Matching%20App%20Gifs/Responsiveness.gif)
