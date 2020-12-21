namespace App {
  // Component Base Class
  // abstract means that we cant instanciate this class it only can be used as base (inheritance)
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;


    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
      // this will never be a nuull and it will be html element
      this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;

      // Get content inside element
      const importedNode = document.importNode(this.templateElement.content, true)

      this.element = importedNode.firstElementChild as U;
      if(newElementId) {
        this.element.id = newElementId
      }

      this.attach(insertAtStart)
    }

    private attach(insertAtStart: boolean) {
      this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    // abstract method cant be private
    abstract configure():void
    abstract renderContent():void
  }
}