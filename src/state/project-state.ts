namespace App {
  // We don't care what this function returns (with void)
  type Listener<T> = (items: T[]) => void

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenFn: Listener<T>) {
      this.listeners.push(listenFn)
    }
  }
  

  // Project state Management (singleton)
  export class ProjectState extends State<Project>  {
    private projects: Project[] = []

    // (singleton) IMPLEMENTATION
    private static instance: ProjectState
    private constructor() {
      super()
    }
    static getInstance() {
      if(this.instance) {
        return this.instance;
      }

      this.instance = new ProjectState()
      return this.instance;
    }

    addProject(title: string, description: string, people: number) {
      const newProject = new Project(
        Math.random().toString(), 
        title, 
        description, 
        people,
        ProjectStatus.Active
      )
      this.projects.push(newProject);
      this.updateListeners()
    }


    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find(prj => prj.id === projectId);
      if(project && project.status !== newStatus) {
        project.status = newStatus
        this.updateListeners()
      }
    }


    private updateListeners() {
      for(const listenerFn of this.listeners) {
        listenerFn(this.projects.slice())
      }
    }
  }

  export const projectState = ProjectState.getInstance();
}