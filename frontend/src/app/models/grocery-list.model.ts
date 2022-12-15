export interface GroceryList {
    GroceryListId?: number;
    Title?: string;
    GroceryItems: GroceryItem[];
    Updated?: string;
}

export interface GroceryItem {
    GroceryItemId?: number;
    GroceryListId?: number;
    Checked?: boolean;
    Name?: string;
    SortOrder?: number;
}