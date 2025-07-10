/* Week 8 Coding Assignment:
   A menu app for weekly workouts */
//Prompts are used to manage workouts and workout components.
 
//ANCHOR - class Component: a formula to render workout components. 
 //SECTION - BEGIN class Component.
class Component {
    constructor(activity, length, details, other) { //Constructor to initialize a component with four parameters; creates ojects.
        this.activity = activity  
        this.length = length
        this.details = details
        this.other = other
    }

    //describe method displays a string with components based on what the user enters in a prompt.
    describe() {
        return `${this.activity}; ${this.length} minutes; details: ${this.details}; additions: ${this.other}`
    }
 }
 //SECTION - END class Component.

//ANCHOR - class Workout: a formula to render a workout. 
 //SECTION - BEGIN class Workout.
 class Workout {
    constructor(type, day) { //Constructor to initialize a workout with two parameters; creates objects.
        this.type = type
        this.day = day
        this.components = [] //a blank array for each instance of a workout; will store the components of a workout.
    }
    
    //addComponent method adds a component to a workout, pushes those into the array. 
    addComponent(component) {  
        if (component instanceof Component) { //A check to make sure there's instances of Component.
            this.components.push(component) //If the argument is valid, component will be aded to the array.
        } else {
            throw new Error(`You can only add an instance of Component. Argument is not a component: ${component}`) 
        }   
    }
  //describe method displays the workout; a string based on what the user enters (type and day of workout).
  describe() {
        return `${this.day}'s workout: ${this.type}` 
      } 
}
 //SECTION - END class Workout.

//ANCHOR - class Menu: a formula to render the menu interface; the user interacts (makes selections) via prompts.
 //SECTION - BEGIN class Menu.
class Menu {
  constructor() { //Constructor to initialize the menu. 
    this.workouts = [] //starting out with an empty array of workouts; any number of workouts will be created. 
    this.selectedWorkout = null //variable created set to null; at the start no workouts are selected. 
  }

  //A method to start the menu; will be called to begin the application and return user selections. Options displayed until user exits.
  start() {
    let selection = this.MainMenuOptions() //the variable 'selection' created to obtain user input.

    while (selection != 0) { //A while loop that keeps the menu going unless user selects the '0' (exit) option.
      if (selection === "1") {
      this.createWorkout();
        } else if (selection === "2") {
      this.viewWorkout();
        } else if (selection === "3") {
      this.deleteWorkout();
        } else if (selection === "4") {
      this.displayWorkouts();
        } else {
      selection = 0
        }
      selection = this.MainMenuOptions()
    }
      alert("All done!") //if '0' is selected, the loop stops and exit message displayed.
  }

  //NOTE the start method code above, contains placeholders for eight more methods. The code for the methods is below.
  //A method to display the main menu options to the user; calls a prompt.
  MainMenuOptions() { //Displays the menu to the user; returning the input coming back from the user prompt.
    return prompt(`  
         0) exit
         1) create a workout
         2) view a workout
         3) delete a workout
         4) display all workouts
    `)
  }

  //A method to display the menu options specific to a workout; the user adds or deletes components.
  WorkoutMenuOptions(workoutData) { // Prompting user selections; display this menu and the workout data that was passed in.
    return prompt(` 
     0) go back
     1) add workout components list
     2) delete workout components list
    ---------------------
     ${workoutData} 
     `)
  } 

  //A method to display all the workouts.
  displayWorkouts() {
    let workoutString = "" //Initializing empty string to construct a list of workouts; a string builds that will contain all the info for a workout.
     for (let i = 0; i < this.workouts.length; i++) {
        let workout = this.workouts[i]
        workoutString += i + ') ' + workout.describe() + "\n" //The describe method being called from Class Workout; each workout's description is added to the string.
     }
    alert(workoutString)   
  }

  //A method to construct a new workout; user is prompted to enter type and day.
  createWorkout() {
    let type = prompt("Enter workout type (cardio, strength or flex/mobility)") //In Class Workout, constructor has two parameters; type and day.
    let day = prompt("Enter workout day")
    this.workouts.push(new Workout(type, day)) //Creating an object using the constructor from Class Workout; a new workout is pushed to the workouts array.
  }

  //A method to view a specific workout; user selects the index associated with the workout.
  viewWorkout() {
    let index = prompt("To view a workout enter index number") //Ask user to enter the index of the workout they want to view.
    if (index > -1 && index < this.workouts.length) { //Validating user input.
      this.selectedWorkout = this.workouts[index]; //Setting the selected workout property to the workout that was input by the user.
      let description = `${this.selectedWorkout.day}: ${this.selectedWorkout.type} \n` //Constructing the description to display selected workout.

        for (let i = 0; i < this.selectedWorkout.components.length; i++) { //Iterating through components array.
          description += `${i}) ${this.selectedWorkout.components[i].describe()}\n`//Adding to the description; calling the describe method from Class Component.
        }
    alert(description); //Complete description is displayed for a workout.

  //A switch statement to determine if components are added to or deleted from a specific workout based on user input. 
    let selection = this.WorkoutMenuOptions(description) //Display options specific to a workout.
      switch (selection ) {
        case "1":
          this.createComponentsList() //CreateComponentsList method called.
          break;
        case "2":
          this.deleteComponentsList() //DeleteComponentsList method called.
        }
     }
  }

  //A method to delete a workout; user selects its index.
  deleteWorkout() {
    let index = prompt("To delete a workout enter index number")
    if (index > -1 && index < this.workouts.length) { //Validate index of a workout that is selected for deletion.
      this.workouts.splice(index, 1) 
    }
   alert('Workout deleted') 
  }

  //A method to add a new components list to selected workout.
  createComponentsList() {
    let activity = prompt("enter activity")
    let length = prompt("enter workout length in minutes")
    let details = prompt("enter workout details")
    let other = prompt("enter additional components")
    this.selectedWorkout.components.push(new Component(activity, length, details, other) //Passing in four arguments from user; creating an instance of components list;
      //pushing it to whatever workout is selected.
    )
  }
  //A method to delete the components list from a selected workout.
  deleteComponentsList() {
    //Show list of workouts.
    let workoutList = '' //Initializing a string for workout list.
      for (let i = 0; i < this.workouts.length; i++) {
        workoutList += `${i}) ${this.workouts[i].describe()}\n` //Adding each workout description to the string.
    }

    let workoutIndex = prompt(`Select workout index to delete a components list\n${workoutList}`) //Prompt user to selection index of a workout.
    workoutIndex = parseInt(workoutIndex) //Converting user input to an integer.

    if (workoutIndex > -1 && workoutIndex < this.workouts.length) { //Validating selected index.
      let selectedWorkout = this.workouts[workoutIndex] //Get the selected workout.

    let componentsList = '' //Initializing an empty string for components.
      for (let i = 0; i < selectedWorkout.components.length; i++) {
      componentsList += `${i}) ${selectedWorkout.components[i].describe()}\n` //Adding component description.
    } 

    if (selectedWorkout.components.length === 0) {
      alert("No components list to delete") //An alert is displayed if there are no components to delete.
      return;
    }

    let componentIndex = prompt(`Workout components list:\n${componentsList}\nEnter index of the components list`) //User to select an index of a components list.
    componentIndex = parseInt(componentIndex); //Converting to an integer.

    // Validate and delete component.
    if (componentIndex > -1 && componentIndex < selectedWorkout.components.length) { //Validating selected index of a components list.
      selectedWorkout.components.splice(componentIndex, 1)  //Removing selected components list from a workout (removing one element).
      alert("Components list deleted")
    } else {
      alert("Invalid components list index")
    }
    } else {
    alert("Invalid workout index")
    }
  }
} 
 //SECTION - END of class Menu.

//ANCHOR - the code below makes a new menu object and then calls the start method on that menu object.
let menu = new Menu() //Instance of a new Menu; new menu object.
menu.start() //Calling the start method on the new menu object; starting the app.

