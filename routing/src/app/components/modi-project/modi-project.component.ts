import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/classes/proyecto.model';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/data-base.service';
import { ServiceProyectsService } from 'src/app/services/service-proyects.service';

@Component({
  selector: 'app-modi-project',
  templateUrl: './modi-project.component.html',
  styleUrls: ['./modi-project.component.css']
})
export class ModiProjectComponent {

  /**
   * @param router This enables the routing 
   * @param service This inyects the service 
   * @param activeRoute This enebles de actives routes to get valued from the url
   * @param alertService This inyects the service alert
   */
  constructor(private router: Router, private service: ServiceProyectsService, private activeRoute: ActivatedRoute, private alertService: AlertService){}


  ngOnInit(): void {

    this.service.getAllProjects().subscribe(myProjects => {
      this.service.listProjects = Object.values(myProjects)
    })

    /**
     * This get the id of the project from the url to be modificated
     */
    this.idProject = this.activeRoute.snapshot.params['id']

    let project = this.service.getProject(this.idProject)

    if(project == undefined){
      this.router.navigate(['/'])
    }

    //This assign the values of the current project 
    this.namePro = project.namePro
    this.technology = project.tecnology
    this.year = project.year
  }

  idProject: number = 0


  /**
   * List of properties of entity project
   */
  namePro: string = ""
  technology: string = ""
  year: number = 0

  /**
   * Call the service to communicate to each other
   * @idProject this is the id of each project, to set its values
   */
  updateProject() {
    if (this.namePro.length > 0 && this.technology.length > 0 && this.year != 0) {
      this.service.setProject(new Project(this.idProject, this.namePro, this.technology, this.year), this.idProject)
      this.alertService.showAlert("Project updated", 3000, "alert-primary") //Method to call the alert
      this.router.navigate(['/'])
    }
    else if (this.namePro.length == 0) {
      this.alertService.showAlert("The field 'Project name' should be refilled", 4000, "alert-warning") //Method to call the alert
    }
    else if (this.technology.length == 0) {
      this.alertService.showAlert("The field 'Technology used' should be refilled", 4000, "alert-warning") //Method to call the alert
    }
    else {
      this.alertService.showAlert("The field 'Year' cannot be 0", 4000, "alert-danger") //Method to call the alert
    }
  }

}
