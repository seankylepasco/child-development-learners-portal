import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Variables
  id: any;
  inputProduct: any;
  ingredientString: any;
  ingredientNumber: any;
  // Arrays
  arrayQty: any=[]=[]; 
  arraySample: any=[]=[]; 
  // Objects
  inputProductArray: any={};
  ingredientArray: any={};
  // Modals Var ------------------
  openAddModal: boolean = false;
  openAddModalIng: boolean = false;

  constructor(private data: DataService) { }
  
  ngOnInit(): void {
    this.getProductId();
  }

  // Add Product Modal ---------------
  openModal(){
    this.openAddModal = true;
  }
  // Close Product Modal ----------
  closeModal(){
    this.openAddModal = false;
    this.arraySample=[];
    this.inputProduct="";
    this.ingredientString="";
  }
  // Ingredient Modal ------------------
  openModalIng(event: any){   
    this.inputProductArray.id = parseInt(event.target.prod_id.value) + 1;
    this.inputProductArray.product_name = event.target.input_product_name.value;
    this.inputProductArray.product_price = event.target.input_product_price.value;
    this.inputProductArray.product_type = event.target.input_product_type.value;
    this.openAddModal = false;
    this.openAddModalIng = true;  
  }
  // Back to Product Add ----------------
  backToAdd(){
    this.openAddModal = true;
    this.openAddModalIng = false;
  }
  // Empty all inputs and arrays ------
  removeAll(){
    this.openAddModalIng = false;
    this.arraySample=[];
    this.arrayQty=[];
    this.ingredientNumber="";
    this.inputProduct="";
    this.ingredientString="";
    alert("New Menu Added!");
  }
  // Push Ingredients array -------
 addIng(){
   this.arraySample.push(this.ingredientString);
   this.arrayQty.push(this.ingredientNumber);
 }
 // Pop Ingredients Array --------
 removeIng(i: number){
   this.arraySample.splice(i, 1);
 }
 // Get Last Product Id for New product and use it for ingredient -------
  getProductId(){
    this.data.getData("get_productId", this.inputProductArray).subscribe((results: any) => {
      this.id = results.data;
    })
  }
   // Send to Database // Product and Ingredient of the Product ---------
   finishAdd(){
    this.ingredientArray.ingredients = this.arraySample;
    this.ingredientArray.qty = this.arrayQty;
    this.ingredientArray.id =  this.inputProductArray.id;
    this.data.getData("add_ing", this.ingredientArray).subscribe((results: any) => {})
    this.data.getData("add_menu", this.inputProductArray).subscribe((results: any) => {})
    window.location.reload();
    this.removeAll();
  }
}
