import supabase from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        const data = await request.json();
        const { t_id: task_id, status } = data;

        // Update task status
        const { data: DBresponse, error: DBerror } = await supabase
            .from("task")
            .update([{ "status": status }])
            .eq("t_id", task_id)
            .select("*");

        if (DBerror) {
            throw DBerror;
        }

        const { t_id, c_id: Celldata_c_id, u_id, date: Taskdate } = DBresponse[0];
        const taskStatus = DBresponse[0].status;

        // If taskStatus is true, we need to create data or increment intensity 
        if (taskStatus == true) {
            const { data: CellData, error: CellError } = await supabase
                .from("cell_data")
                .select("*")
                .eq("c_id", Celldata_c_id)
                .eq("date", Taskdate);

            if (CellError) {
                throw CellError;
            }

            // Check if the array has data
            if (CellData && CellData.length > 0) {
                console.log("Data bhetyo ta increment garau aba");
                
                // Increment intensity logic
                const currentIntensity = CellData[0].intensity;
                const newIntensity = currentIntensity + 1;
                
                const { data: updatedCellData, error: updateError } = await supabase
                    .from("cell_data")
                    .update([{ "intensity": newIntensity }])
                    .eq("c_id", Celldata_c_id)
                    .eq("date", Taskdate)
                    .select();
                    
                if (updateError) {
                    throw updateError;
                }
                
                return NextResponse.json({ 
                    taskStatus: DBresponse, 
                    CellData: updatedCellData 
                }, { status: 200 });
                
            } else {
                console.log("Data bhetena banaunau paryo");
                const intensity = 1;
                const { data: CellCreateData, error: CellCreateError } = await supabase
                    .from("cell_data")
                    .insert([{ 
                        "c_id": Celldata_c_id, 
                        "u_id": u_id, 
                        "intensity": intensity, 
                        "date": Taskdate 
                    }])
                    .select();

                if (CellCreateError) {
                    throw CellCreateError;
                }

                console.log("Data banyo");
                return NextResponse.json({ 
                    taskStatus: DBresponse, 
                    CellData: CellCreateData 
                }, { status: 200 });
            }
        } else {
            // Handle the case when taskStatus is false
            console.log("Decrement garnu parxa");
            
            const { data: CellData, error: CellError } = await supabase
                .from("cell_data")
                .select("*")
                .eq("c_id", Celldata_c_id)
                .eq("date", Taskdate);
                
            if (CellError) {
                throw CellError;
            }
            
            if (CellData && CellData.length > 0) {
                const currentIntensity = CellData[0].intensity;
                
                if (currentIntensity <= 1) {
                    // Delete the record if intensity will be 0
                    const { data: deletedData, error: deleteError } = await supabase
                        .from("cell_data")
                        .delete()
                        .eq("c_id", Celldata_c_id)
                        .eq("date", Taskdate);
                        
                    if (deleteError) {
                        throw deleteError;
                    }
                    
                    return NextResponse.json({ 
                        taskStatus: DBresponse, 
                        CellData: "Record deleted as intensity would be 0" 
                    }, { status: 200 });
                } else {
                    // Decrement intensity
                    const newIntensity = currentIntensity - 1;
                    
                    const { data: updatedCellData, error: updateError } = await supabase
                        .from("cell_data")
                        .update([{ "intensity": newIntensity }])
                        .eq("c_id", Celldata_c_id)
                        .eq("date", Taskdate)
                        .select();
                        
                    if (updateError) {
                        throw updateError;
                    }
                    
                    return NextResponse.json({ 
                        taskStatus: DBresponse, 
                        CellData: updatedCellData 
                    }, { status: 200 });
                }
            } else {
                // No data found to decrement
                return NextResponse.json({ 
                    taskStatus: DBresponse, 
                    CellData: "No data found to decrement" 
                }, { status: 200 });
            }
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "API HIT FAIL" }, { status: 500 });
    }
}