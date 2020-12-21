import { Component } from './base-components.js'
import { validate, Validatable } from '../util/validation.js'
import { autoBind } from '../decorators/autobind.js'
import { projectState } from '../state/project-state.js'

  // Project input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    super('project-input', 'app', true, 'user-input')

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

    this.configure()
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);  
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | undefined {
    const enteredTitle = this.titleInputElement.value
    const enteredTitleDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElement.value
    

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }
    const descriptionValidatable: Validatable = {
      value: enteredTitleDescription,
      required: true,
      minLength: 5
    }
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 10
    }

    if(
      validate(titleValidatable) && 
      validate(descriptionValidatable) && 
      validate(peopleValidatable)
      ) {
        return [enteredTitle, enteredTitleDescription, +enteredPeople]       
      } else {
        alert('Invalid input, please try again!')
        return;
      }
  }


  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput
      projectState.addProject(title, desc, people)
      this.clearInputs()
    }
  }
}
