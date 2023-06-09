import { Injectable } from '@angular/core';
import { Project } from '../classes/proyecto.model';
import { DataBaseService } from './data-base.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProyectsService {


  constructor( private database : DataBaseService) { }

  //Array of projects 
  listProjects: Project[] = []
  
  /**
   * Get projects from the database as Observable
   */
  getAllProjects(){
    return this.database.getProjectsFromFireBase()
  }

  /**
   * Add to the array a new project increasing in one the id property
   */
  addToList(name: string, tecnology: string, year: number) {
    let idProject = this.listProjects.length 
    this.listProjects.push(new Project(idProject, name, tecnology, year))    
    this.database.saveProjectsInFireBase(this.listProjects)
  }

  /**
   * This function use the id value to get the position of the array list projects
   * @param idProject This is the project id will be modified
   */
  getProject(idProject: number): Project {
    return this.listProjects[idProject]
  }

  /**
   * Set the values of the project as a setter function
   * @param project This is the object
   * @param idProject This value comes from the component modify, with the current project
   */
  setProject(project: Project, idProject : number) {
    this.listProjects[project.id] = project
    this.database.updateProjectFromFireBase(idProject, project)
  }

  /**
   * Function to delete a project from the array
   * @param idProject Take the value id of the project to be removed
   */
  deleteProject(idProject: number): void {
    this.listProjects.splice(idProject, 1)
    this.database.deleteProjectFromFireBase(idProject)
    //For iteration to reassign the values of each projects' id 
    for (let i = 0; i < this.listProjects.length; i++) {
      if(this.listProjects[i].id == 0){
        //keep the value as 0 for the first element
        this.listProjects[i].id = (i)
      }
      this.listProjects[i].id = (i)
    }
    //Update the database with the new position of array id's
    this.database.saveProjectsInFireBase(this.listProjects)
  };
}



