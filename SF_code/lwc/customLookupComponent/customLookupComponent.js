import { LightningElement, track, api } from 'lwc';
import getAphInvLookupData from '@salesforce/apex/JN_AphInventoryManagementController.getAphInvLookupData'

export default class CustomLookupComponent extends LightningElement {
    @api countryname;
    @track recordsList;
    @track selectedValue = "";
    error;
    recordselected = false;
    @api iconname;
    @track noResults = false;
    
    //Method to query data after typing search term
    onKeyChange(event) {
        console.log('On lookup keychange method');
        this.selectedValue = event.target.value;
        if(this.selectedValue!=null && this.selectedValue!=''){
            getAphInvLookupData({searchKey : this.selectedValue, countryName : this.countryname })
                .then(result => {
                    console.log('result=>'+result.length);
                    if(result.length>0){
                        this.recordsList = result;
                        this.noResults= false;
                    }
                    else{
                        this.recordsList='';
                        this.noResults= true;
                    }
                    
                })
                .catch(error => {
                    //exception handling
                    this.error = error;
                })
        }
        else{
           
            this.noResults= false;
            this.recordsList='';
            console.log('Else no rec found noResults' +this.noResults);
        }
        
    }
    //Method to clear search list and show selected value.
    @api clearSelection() {
        this.recordselected = false;
        this.selectedValue = "";
        this.recordsList = undefined;
        const clearEvent = new CustomEvent('cleared', {
            detail: {
                ClearValue : this.selectedValue
            } 
        });
        this.dispatchEvent(clearEvent);
    }

    //Method to pass selected record to parent component.
    setSelectedValue(event) {
        this.selectedValue = event.target.dataset.itemname;
        this.recordselected = true;
        this.recordsList = undefined;
        event.preventDefault();
        const selectedEvent = new CustomEvent('selected', {
            detail: {
                Name : this.selectedValue,
                Id : event.target.dataset.itemid,
                InvDesc : event.target.dataset.itemdesc,
                Uom : event.target.dataset.itemuom
                // ObjectName : this.objectname
            } 
        });
        this.dispatchEvent(selectedEvent);
    }
}