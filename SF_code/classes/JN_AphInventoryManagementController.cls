public with sharing class JN_AphInventoryManagementController {
    
    @AuraEnabled(cacheable=true)
    public static list<sObject> getAphInvLookupData(string searchKey, string countryName) {    
        List <sObject> returnList = new List <sObject> ();
         string sWildCardText = '%' + searchKey + '%';
         string sQuery = 'Select Id,Name,JN_Aph_Inv_Inventory_Description__c,JN_Aph_Inv_Unit_of_Measure__c From JN_Apheresis_Inventory__c Where JN_Aph_Inv_Active__c = true and JN_Aph_Inv_Country__c = :countryName and (JN_Aph_Inv_Inventory_Description__c like :sWildCardText OR JN_Aph_Inv_Unit_of_Measure__c like :sWildCardText) order by JN_Aph_Inv_Inventory_Description__c,JN_Aph_Inv_Unit_of_Measure__c';
         for (sObject obj: database.query(sQuery)) {
            returnList.add(obj);
        }
        return returnList;
    }
    
}