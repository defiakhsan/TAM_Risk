import { Component, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { NgForm } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
//import { RiskRegisterModalComponent } from "./modal/risk.register.modal.component";
import * as moment from "moment";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-reminder",
  templateUrl: "./reminder.component.html"
})

export class ReminderComponent {
  @ViewChild("myForm") private myForm: NgForm;

  settings: any = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    mode: "inline",
    sort: true,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: true,
      delete: false,
      position: "right",
      columnTitle: "Modify",
      width: "10%"
    },
    pager: {
      display: true,
      perPage: 30
    },
    columns: {
      counterNo: {
        title: "No",
        type: "number",
        filter: false,
        editable: false,
        width: "5%"
      },
      description: {
        title: "Description",
        type: "string",
        filter: false,
        editable: true,
        width: "80%"
      },
      score: {
        title: "Score ",
        type: "number",
        filter: false,
        editable: true,
        width: "10%"
      }
    }
  };
  source: LocalDataSource = new LocalDataSource();

  showMan: boolean;
  showView: boolean;
  constructor() {
    this.showMan = false;
    this.showView = false;
  }
  ManReminder() {
    this.showMan = true;
    this.showView = false;
  }
  ViewReminder() {
    this.showMan = false;
    this.showView = true;
  }
  

  //subscription: any;
  //activeModal: any;
  //constructor(private modalService: NgbModal, private toastr: ToastrService) { }

  //ngAfterViewInit() { }

  //submit() {
  //  this.toastr.success("Data Saved!");
  //}
}
