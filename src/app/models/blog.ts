// Product class to define this object's properties.
export class Blog {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public status: string,
        public category: string,
        public meta_keyword: string,
        public meta_description: string,
        public visits: string,
        public created_date: string,
        public modified_date: string,
        public created_by: string
    ){}
}