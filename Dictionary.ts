/**
 * .Net style dictionary for typescript 2
 */
export module DictionaryTs{

    /**
     * Definitions for a key value pair data structure
     */
    interface IKeyValuePair<TKey,TValue> {
        key: TKey;
        value: TValue;
    }

    /** 
     * Dictionary object which provides the main functionality
    */
    export class Dictionary<TKey,TValue>{

        /**
         * Main data storage for the class
         */
        private readonly elements : IKeyValuePair<TKey,TValue>[] = []

        /**
         * Default Constructor
         * @param data 
         */
        constructor(data : IKeyValuePair<TKey,TValue>[]){
            this.elements = data;
        }

        //#region Edit Collection

        /**
         * Adds an element to the collection
         * @param element 
         */
        add(element : IKeyValuePair<TKey,TValue> ) : void{

            //Dictionary cannot contain duplicate keys
            if(this.any(x => x.key === element.key)){
                throw "Duplicate key cannot be added to the collection";
            }
            //Add new element
            this.elements.push(element);
        }

        /**
         * Remove element from the dictionary
         * @param element 
         */
        remove(element : IKeyValuePair<TKey,TValue>) : void{
            
            //If the keys match remove at index
            for(let i = 0; i < this.elements.length; i++){
                if(this.elements[i].key === element.key) 
                    this.removeAt(i);
            }
        }

        /**
         * Removes element at a given index
         * @param i 
         */
        removeAt(i : number) : void{
            
            //Remove the element from the array at index provided
            this.elements.splice(i,1);
        }

        //#endregion

        //#region LINQ 

        /**
         * Checks to see if any elements in the dictionary match the predicate
         * @param predicate 
         */
        any(predicate?: (value?: IKeyValuePair<TKey, TValue>,
            index?: number,
            list?: IKeyValuePair<TKey, TValue>[]) => boolean): boolean {
            if (predicate == undefined) return this.elements.length > 0; 
            return this.where(predicate).length > 0;
        }

        /**
         * Checks to see if all elements match the predicate
         * @param predicate 
         */
        all(predicate?: (value?: IKeyValuePair<TKey, TValue>,
            index?: number,
            list?: IKeyValuePair<TKey, TValue>[]) => boolean): boolean {
            //Make sure the length of items returned matches those returned by the filter
            return this.where(predicate).length === this.elements.length;
        }

        /** 
         * How many elements in the collection
        */
        count() : number {
            return this.elements.length;
        }

        /** 
        * Returns the first element in the collection which matches the predicate
        */
        firstOrDefault(predicate: (value?: IKeyValuePair<TKey, TValue>,
            index?: number,
            list?: IKeyValuePair<TKey, TValue>[]) => boolean): IKeyValuePair<TKey, TValue> {

            const results = this.where(predicate);
            return results.length ? results[0] : null;
        }

        /**
         * Returns all the elements in the collection which match the predicate
         * @param predicate 
         */
        where(predicate: (value?: IKeyValuePair<TKey, TValue>,
            index?: number,
            list?: IKeyValuePair<TKey, TValue>[]) => boolean) : IKeyValuePair<TKey, TValue>[] {
            return this.elements.filter(predicate);
        }

        /**
         * Select the element of the array that your require
         * @param selection 
         */
        select<ToutPut>(selection: (element: IKeyValuePair<TKey, TValue>, 
            index: number) => ToutPut) : ToutPut[]{
            return this.elements.map(selection);
        }

        /** 
        * Returns the first element in the collection which matches the predicate
        */
        SingleOrDefault(predicate: (value?: IKeyValuePair<TKey, TValue>,
            index?: number,
            list?: IKeyValuePair<TKey, TValue>[]) => boolean): IKeyValuePair<TKey, TValue> {
            const results = this.where(predicate);
            if(results.length > 1) throw "Collection contained more than one element";
            return results.length ? results[0] : null;
        }

        //#endregion

    }

}