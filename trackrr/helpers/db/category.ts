import supabase from "@/config/dbConfig";

export interface Category {
    c_id: string;
    u_id: string;
    category_name: string;
    category_type: string;
    icon_name?: string;
    color: string;
    description?: string;
    created_at?: string;
  }

  export interface CategoryCreateData {
    // c_id and created_at are not needed for creation cause they are auto-generated
    u_id: string | undefined; 
    category_name: string;
    category_type: string |null;
    icon_name?: string |null;
    color?: string;
    description?: string;
    // Add any other fields need for category creation
  }

export async function getCategories(u_id: string): Promise<Category[]> {
    const { data:categories, error } = await supabase
        .from("category")
        .select('*')
        .eq('u_id', u_id);

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return categories || [];

//     const { data: categories, error } = await supabase
//     .from("categories")
//     .select("*")
//     .eq("u_id", u_id)

// if (error) {
//     console.error("Error fetching categories:", error.message);
//     return [];
// }
// return categories as Category[];
}

export async function createCategory(data: CategoryCreateData): Promise<Category>{
    console.log("Creating category with data:", data);
    const { data: newCategory, error } = await supabase
        .from("category")
        .insert([data])
        .select()
        .single();

    if (error) {
        console.error('Error creating category:', error);
        throw new Error('Failed to create category');
    }
    return newCategory;
}


//Update category
export async function updateCategory( c_id: string, updates: Partial<CategoryCreateData> ): Promise<Category> {
    const { data: updatedCategory, error } = await supabase
      .from("category")
      .update(updates)
      .eq("c_id", c_id)
      .select()
      .single();
  
    if (error) throw error;
    return updatedCategory;
  }


//Delete category by id
export async function deleteCategory(c_id: string): Promise<Category> {
    const { data: deletedCategory, error } = await supabase
      .from("category")
      .delete()
      .eq("c_id", c_id)
      .select()
      .single();
  
    if (error) throw error;
    return deletedCategory;
  }