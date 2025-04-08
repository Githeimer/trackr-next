import supabase from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export interface CellRequest {
  today: string;
  oneYearAgo: string;
  categoryId: number;
  userId: number;
}

export async function GET(params: NextRequest) {
    try {
      const { searchParams } = new URL(params.url);
  
      const today = searchParams.get("today");
      const oneYearAgo = searchParams.get("oneYearAgo");
      const categoryId = searchParams.get("categoryId");
      const userId = searchParams.get("userId");
  
      if (!today || !oneYearAgo || !categoryId || !userId) {
        return NextResponse.json({ message: "Missing query parameters" }, { status: 400 });
      }
  
      const data: CellRequest = {
        today,
        oneYearAgo,
        categoryId: Number(categoryId),
        userId: Number(userId),
      };
  
      console.log("Date range:", { oneYearAgo: data.oneYearAgo, today: data.today });
  
      const { data: CellData, error: CellError } = await supabase
        .from("cell_data")
        .select("*")
        .eq("c_id", data.categoryId)
        .eq("u_id", data.userId)
        .gte("date", data.oneYearAgo)
        .lte("date", data.today);
  
      if (CellError) {
        console.error(CellError);
        return NextResponse.json({ message: "Failed to fetch cell data" }, { status: 500 });
      }
  
      console.log(`Found ${CellData.length} records`);
  
      return NextResponse.json({ 
        message: "API HIT SUCCESS", 
        dateParams: { oneYearAgo: data.oneYearAgo, today: data.today },
        CellData 
      }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "API HIT FAIL" }, { status: 500 });
    }
  }