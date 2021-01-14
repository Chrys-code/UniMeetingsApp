<h1 style="color:#0abead; text-align: center;"> COM623, Contemporary Web Applications</h1>
<h3 style="color:#0abead; text-align: center;">Assessment 2. Implementation and Report </h3>
<h3 style="color:#0abead; text-align: center;">Krisztian Nagy, Q14180707</h3>
<h3 style="color:#0abead; text-align: center;">Project: UniMeetingApp</h3>

<h3 style="color:#0abead; text-align: center;">Live project: <a href="https://unimeetingsapp.herokuapp.com/" style="color:#0880A1; font-weight: bold" rel="noopener noreferrer" target="_blank">UniMeetingsApp</a></h3>

<h3 style="color:#0abead; text-align: center;">Project source: <a href="https://github.com/Chrys-code/com623
" style="color:#0880A1; font-weight: bold" rel="noopener noreferrer" target="_blank">GitHub Repository</a></h3>

<h3 style="color:#0abead; text-align: left;">Introduction</h3>

In this assessment you can read about the technical implementation of the proposed design created in Assessment 1 and the implementation of development methodology that is used to deliver a contemporary web application that is targeted on the healthcare sector in usability with the aim to help students at the University in some way. The defined problem statement in assessment 1 is that students cannot estimate the probability of catching the virus from another school mate. The next application will target to help students estimate the danger before thinking about meeting with others from their school.

<h3 style="color:#0abead; text-align: left;">2 Methodology</h3>

In assessment 1. Design Thinking is used as an overarching methodology to propose and define the problem and to create a prototype version of the solution or the tool that can be used that helps users solve their problem. The defined problem was that students cannot estimate the probability of catching the virus from another school mate. According to the conducted research from assessment 1, the collected data shows that the previous problem statement is proven to be true and is based on the communication between students. The information sharing between students to forecast a probability of spreading the virus is lacking. This way participants of an event are unable to estimate the danger.

<h3 style="color:#0abead; text-align: left;">2.1 Development Methodology</h3>

In this assessment Design Thinking is continued. From the 5 step overarching methodology: Emphasize, Define, Ideate, Prototype and Test, this report and artefact consists of two of the last steps: Prototype and Test. However, these two steps are consequent, it is not limited to one iteration. Once the prototype is tested, there might be changes that require testing again. To perform iterations between prototyping and testing agile methodology was implemented. Using agile methodology the customer becomes the center of the development. This allows developers to develop the application with the user needs in the center preventing developers to deliver dysfunctional or unintended units that need to be re-implemented. Agile methodology emphasizes communication between the developer and enables less work to be done to achieve the required results.

<h3 style="color:#0abead; text-align: left;">2.2 Implementation</h3>

As mentioned in this project I used agile methodology for development. The target audience falls in the same area as the customers, not as in the case of a company would develop an application for a customer who has a target audience. As they are students and not a single person to develop the application for, the methodology takes multiple users in the centre of the development and listens to multiple ideation, requirements and proposals what a certain functionality should provide for the user. As the prototype of the application contained three different functionality, four different meetings were held during development. The first: an overall discussion about the initial application and concepts that should be implemented. This allowed me to overview the application as a whole. The other meetings were for different functionalities such as: Initial user input to indicate an event that the user participated on outside the application; The availability to create a meeting within the application; And the last is to propose further development for the application in short term for those ideas and solutions that are not part of the proposed application but can be added to make it complete.

<h3 style="color:#0abead; text-align: left;">2.3.1 Core application</h3>

Form assessment 1 the proposed design was accepted that allowed me to create the core of the application. This means the login system and the main viewports of the application such as the main or landing page that contains the path to the functions that the application can provide to the user and the view of these functional pages. It was possible as both the login system and database design of the login system are separated from the application’s inner functionality. However, the initial prototype consisted of a registration page as well, on the first communication between me as developer and the students or customers, the customers indicated that the registration interface might be unnecessary from the user-end. Since the users are ordered to schools, schools should be able to register their own students ( See appendix figure1). Hence, the registration interface was not developed for the application and to provide a viable solution they proposed an access to the application from the schools-end where they can see the meetings. This was added to further development.
2.3.2 Database and server design

The first meeting was held about the deliverable application as a whole that allowed me to design the database. It was one of the most important tasks during development as I have chosen to use GraphQL to maintain user related data in the data layer of the application. The strength of GraphQL is that it can be implemented before the development starts on the front-end if the developer team knows what data will be required and provides the availability of each database collection on a single request.

<h3 style="color:#0abead; text-align: left;">2.3.3 Functionalities</h3>

The very first functionality was to let students see other students regarding the virus. This was implemented as a list, where indicators are assigned to each user to provide insight to the users about the state of other users if they are registered under the same school. However, this functionality was the most important of all as it was strictly answering the problem statement:”Students cannot estimate the probability of catching the virus from another school mate”, it was accepted as it was proposed in the prototype.

There are two side functionalities such as allowing users to update their last event time to provide data for the listings, this way the indicator changes next to their names referring to the time they provided. If no data provided the indicator is red, which encourages users to provide dates. The other functionality is to create meetings within the application and the server updates every participant with the event details on the day the event takes place. This allows schools to explore connections between students if someone signs illness regarding the pandemic and make schools able to indicate to other students those might be affected. These functionalities do not provide answers directly to the problem but provide usability and context to the application which makes the application useful. During the meeting where the meeting functionality was discussed, students proposed two other functionality that should be working close with the create meetings functionality. These functions were: Notification about an appointment that can be accepted or refused by invited students and the possibility to indicate illness within the application, then the application would notify users those might be affected based on the saved meetings within the database (See appendix figure 2).

<h3 style="color:#0abead; text-align: left;">3 Conclusion</h3>

To reflect on the assessment to deliver an application based on a previously presented prototype focusing on implemented overarching and development methodologies requires different aspects of web development to work well together to deliver a certain standard quality. With this project I had to learn and work through these different aspects of developing an application such as using Design Thinking to define a problem and propose a solution or tools to be used to solve the defined problem. Implementing agile as a development methodology, which meant in this project to work close and keep an open line of communication with the user base and to work around them.

The implementation of agile methodology required me to understand the basics of agile development and to modify it to fit for a small scale project and to a certain number of users instead of a single customer. However, I think agile methodology is more efficient on a large scale, it was not a bad choice to use in this project. It allowed me to develop the application with a user centred approach and prevented me from working on functionalities that are not necessary for the project. Another advance in using agile methodology is that the user base proposed functionalities that are consequent from existing features. The meetings are held in a Facebook chat, which is less formal, but it was easier to keep up the contact with the user base instead of using other platforms.

The application is working as a whole for students, but some actions are required outside the application to make it as a tool in schools. These actions are: register a school and its students; indicate illness; notify affected users in case of illness. The application needs further development where these required actions should be implemented within the application. These functionalities require more time to implement as they are proposed by the user base during development.

In assessment 1. Design Thinking is used as an overarching methodology to propose and define the problem and to create a prototype version of the solution or the tool that can be used that help users solve their problem.

<h3 style="color:#0abead; text-align: left;">4 Appendix</h3>
 - 4.1 Figure: 1
 
![figure1](https://user-images.githubusercontent.com/55841911/104658170-26cff200-56ba-11eb-961e-7aa046332e47.png)
Remove free registration, propose school-end interface

 - 4.2 Figure: 2
 
 ![figure2](https://user-images.githubusercontent.com/55841911/104658298-6565ac80-56ba-11eb-9229-fa9495beefd4.png)
 Propose notifications & function to sign illness


