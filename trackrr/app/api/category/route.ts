import { NextResponse, NextRequest } from "next/server";
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} from "@/helpers/db/category";
import { CategoryCreateData } from "@/helpers/db/category";

//Get code
export async function GET(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const u_id = searchParams.get("u_id");
      if (!u_id) {
        return NextResponse.json({ error: "u_id is required" }, { status: 400 });
      }
      const categories = await getCategories(u_id);
      return NextResponse.json(categories);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
      const body: CategoryCreateData = await request.json();
      const newCategory = await createCategory(body);
      return NextResponse.json(newCategory, { status: 201 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } 


//Update category by id (api)
// export async function PUT(request: NextRequest) {
//   try{
//     const body = await request.json();
  
//     const { c_id, ...updates } = body;

//     if(!c_id) {
//       return NextResponse.json({ error: "c_id is required"});
//     }

//     const data = await updateCategory(c_id, updates);

//     return NextResponse.json(data, { status: 200 });
//   }
//   catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


//Patch Code
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url); // ?c_id = ...

    const c_id = searchParams.get("c_id");
    const u_id = searchParams.get("u_id");

    if (!c_id) {
      return NextResponse.json({ error: "c_id is required" }, { status: 400 });
    }

    if (!u_id) {
      return NextResponse.json({ error: "u_id is required" }, { status: 400 });
    }
    
    const updates = await request.json();
    const updatedCategory = await updateCategory(c_id, { ...updates, u_id });

    return NextResponse.json(updatedCategory, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


//Delete Code:
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url); // ?c_id = ...

        const c_id = searchParams.get("c_id");
        // const u_id = searchParams.get("u_id");

        if (!c_id) {
            return NextResponse.json({ error: "c_id is required" }, { status: 400 });
        }
        // if (!u_id) {
        //     return NextResponse.json({ error: "u_id is required" }, { status: 400 });
        // }

        const deletedCategory = await deleteCategory(c_id);
        return NextResponse.json(deletedCategory, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}