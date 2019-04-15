# Ga.timetable
Genetic algorithm used to solve University Course Timetabling Problems

This software was created for an international exchange as a research project, in which we planned to use AI (a genetic algorithm) to create better automated schedules for new students at college. 

We took hard and soft constraints based on the necesities at our university.

//Fitnes calculation constraints

//Hard Constraints
Each assignment must appear 2 times                     => evaluated at checkSubjectTwoTimes()              ########################### +10 => 60
subject.students must be lesser than room.capacity      => evaluated at fitnessBlock()                      $$$$$ mandatory
room.type must be equal to subject.need                 => evaluated at fitnessBlock()                      $$$$$ mandatory
subject.doubleBlock must appear at the timetable        => evaluated at checkDoubleBlock()                  ########################### +2 && +8 => 20
Subject must appear at teacher's list of topics         => evaluated at fitnessBlock()                      $$$$$ mandatory
The same teacher per subject                            => evaluated at checkTeacherOnSubject()             ########################### +10
No subjects allowed after 4PM on saturday               => evaluated at checkOnSaturdays()                  ########################### +5 => 60

//Soft Constraints
teacher.pref should appear at the created block         => evaluated at checkTeacherPref()                  ########################### +2
subjects on the same day should be as close as posible  => evaluated at checkConsecutives()
rooms should be as close as possible                    => evaluated at checkRoomsAreClose()
prevent isolated subjects on a day                      => evaluated at checkNonSingleDays()
doubleBlock in the same classroom                       => evaluated at checkDoubleBlock()
lunchTime on 12                                         => evaluated at checkLunchTime()

Fitness -> push() -> [] ... n*fitness

population[0].data.subjectName.unique();

This solution aims to solve a very specific problem in my college, we tried it with "in code" variables, but it can be modified to get them from a data base or any data source.
