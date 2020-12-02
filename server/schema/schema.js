const graphql = require('graphql');
const _ = require('lodash');
const Student = require('../models/student');
const School = require('../models/school');
const Event = require('../models/event');

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

///////////////////////
// Schema Objects
///////////////////////

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        event: {
            type: EventType,
            resolve(parent, args) {
                if(parent.eventId){
                    return Event.findById(parent.eventId)
                } else {
                    return null
                }
            }
        },
        school: {
            type: SchoolType,
            resolve(parent, args) {
                return School.findById(parent.schoolId)

            },
        }
    })
})


const SchoolType = new GraphQLObjectType({
    name: 'School',
    fields: () => ({
        id: {type:GraphQLID},
        name: {type: GraphQLString},
        students: {
            type: new GraphQLList(StudentType),
            resolve(parent, args) {
                return Student.find({schoolId: parent.id})
            }
        }
    })
})


const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: {type:GraphQLID},
        location: {type: GraphQLString},
        date: {type: GraphQLString},
        students: {
            type: new GraphQLList(StudentType),
            resolve(parent, args) {
                return Student.find({eventId: parent.id})
            }
        }
    })
})


///////////////////////
// Root Query
///////////////////////

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        student: {
            type: StudentType,
            args: {
                id: {type:GraphQLID},
            },
            resolve(parent, args){
                return Student.findById(args.id);
            }
        },
        school: {
            type: SchoolType,
            args: {
                id: { type: GraphQLID},
            },
            resolve(parent, args){
                return School.findById(args.id);
            }
        },
        event: {
            type: EventType,
            args: {
                id: {type: GraphQLID},
            },
            resolve(parent, args){
                return Event.findById(args.id);
            }
        },
        students: {
            type: new GraphQLList(StudentType),
            resolve(parent, args){
                return Student.find({});
            }
        },
        schools: {
            type: new GraphQLList(SchoolType),
            resolve(parent, args){
                return School.find({});
            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args) {
                return Event.find({});
            }
        }
        
    }
})

///////////////////////
// Mutations
///////////////////////

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStudent: {
            type: StudentType,
            args: {
                name: {type: GraphQLString},
                password: {type: GraphQLString},
                schoolKey: {type: GraphQLString}
            },
            resolve(parent, args) {
                let student = new Student({
                    name: args.name,
                    password: args.password,
                    schoolKey: args.schoolKey,
                });
                return student.save();
            }
        },
        addSchool: {
            type: SchoolType,
            args: {
                name: {type: GraphQLString},
            },
            resolve(parent, args) {
                let school = new School({
                    name: args.name,
                });
                return school.save();
            }
        },
        addEvent: {
            type: EventType,
            args: {
                    location: {type: GraphQLString},
                    date: {type: GraphQLString},
                    students: {type: GraphQLID},  
            },
            resolve(parent, args) {
                let event = new Event({
                    location: args.location,
                    date: args.date,
                    students: args.students,
                });
                return event.save();
            }
        },
        updateStudent: {
            type: StudentType,
            args: {
                studentId: {type: GraphQLID},
                eventId: {type: GraphQLID},
            },
            resolve(parent, args) {
                return new Promise((resolve, reject) => {
                    Student.findOneAndUpdate(
                        {"_id": args.studentId},
                        {"$set": {eventId: args.eventId}},
                        {"new": true}
                    ).exec((err, res) => {
                        console.log('test', res)
                        if(err) {
                            reject(err)
                        } else {
                            resolve(res)
                        }
                    })

                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
