"use client"
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from "axios";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Code, BookOpen, Music, Heart, Zap, CheckCircle, Leaf, BarChart } from 'lucide-react';
import { useAuthStore } from '@/store/store';
import { CategoryCreateData } from '@/helpers/db/category';
import { useSession } from 'next-auth/react';
import { Switch } from './ui/switch';

export const categories = [
    { name: "Coding", icon: Code },
    { name: "Study", icon: BookOpen },
    { name: "Music", icon: Music },
    { name: "Health", icon: Heart },
    { name: "Fitness", icon: Zap },
    { name: "Habit", icon: CheckCircle },
    { name: "Plant", icon: Leaf },
    { name: "Workout", icon: BarChart }
];

export const allIcons = [
    { name: "Code", icon: Code },
    { name: "BookOpen", icon: BookOpen },
    { name: "Music", icon: Music },
    { name: "Heart", icon: Heart },
    { name: "Zap", icon: Zap },
    { name: "CheckCircle", icon: CheckCircle },
    { name: "Leaf", icon: Leaf },
    { name: "BarChart", icon: BarChart }
];

const AddCategoryDialog = () => {
    const { user } = useAuthStore();
    const {data:session} = useSession();
    const [category, setCategory] = useState<string>("");
    const [categoryType, setCategoryType] = useState<string>();
    const [description, setDescription] = useState<string>("");
    const [selectedIcon, setSelectedIcon] = useState<string | undefined>(undefined);
    const [isWeeklyBased, setIsWeeklyBased] = useState<boolean>(false);
    const colorRef = useRef<HTMLInputElement>(null);

    const [open, setopen] = useState(false);

    const clearAllfields=()=>{
        setCategory("");
        setCategoryType("");
        setDescription("")
    }

    const handleAddCategory = async () => {
        console.log(category, description, selectedIcon, categoryType)
        if (!category || !description || !selectedIcon || !categoryType ) {
            toast.error("Please fill all required fields.");
            return;
        }

        try {
            const dataToServer: CategoryCreateData = {
                u_id:session?.user.id as string  ,
                category_name: category,
                icon_name: selectedIcon,
                category_type: categoryType,
                description: description,
                color: colorRef.current?.value || "#11ae70", // Default color if none selected
                isWeeklyBased: isWeeklyBased || false
            };


            const response = await axios.post("/api/category", dataToServer);

            console.log(response);

            if (response.status==201) {
                setopen(false);
                clearAllfields();
                window.location.reload();
                toast.success("Category added successfully! Try adding tasks.");
            } else {
                toast.error("Failed to add category. Please try again.");
            }
        } catch (error) {
            toast.error("Error occurred while adding the category.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-600 cursor-pointer" >+ Add Category</Button>
            </DialogTrigger>
            <DialogContent className="w-[90%] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] md:max-h-[100vh] overflow-y-auto  
    bg-black/70 md:bg-black/80 sm:bg-black border border-white/10 rounded-xl shadow-xl text-white">

                <DialogHeader>
                   <div className='flex-col gap-1 flex'>
                   <DialogTitle className="text-xl font-bold">Add Category</DialogTitle>
                   <p className='text-gray-400 text-xs'>User will provide task for each day and completion will be reflected on contribution box</p>
                   </div>
                </DialogHeader>


                <div className="grid gap-4 py-4">
                <div className="flex items-center gap-4 mb-4 flex-row">

                       <Switch 
                           className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-green-500 "
                          checked={isWeeklyBased}
                          onCheckedChange={(checked) => setIsWeeklyBased(checked)}
                       /> 
                       <Label htmlFor="weekly-based" className="text-sm font-medium text-gray-200">
                                {isWeeklyBased? "Weekly Based" : "Daily Based"}
                        </Label>  
                        <span className='text-xs text-gray-400 font-medium'>{isWeeklyBased?"You will set the repetitve taks for the week":"You will set daily tasks"} </span>
                           
                    </div>
                    <div className="grid gap-2">
                        <Label>Habit Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter Habit name"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Icon</Label>
                        <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto pr-2">
                            {allIcons.map((iconItem) => {
                                const IconComponent = iconItem.icon;
                                return (
                                    <div
                                        key={iconItem.name}
                                        onClick={() => setSelectedIcon(iconItem.name)}
                                        className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-all ${
                                            selectedIcon === iconItem.name ? `bg-green-900 scale-105 border border-white/30` : 'bg-white/10 hover:bg-white/40'
                                        }`}
                                    >
                                        <IconComponent className="h-6 w-6 mb-1" />
                                        <span className="text-xs truncate w-full text-center">{iconItem.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Icon Color</Label>
                        <input
                            type="color"
                            defaultValue="#11ae70"
                            ref={colorRef}
                            className="w-full h-10 cursor-pointer bg-transparent border-white/20"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Category</Label>
                        <RadioGroup
                          
                            className="grid grid-cols-2 gap-2"
                            value={categoryType}
                            onValueChange={(value)=>{setCategoryType(value)}}
                        >
                            {categories.map((cat) => {
                                const IconComponent = cat.icon;
                                return (
                                    <div key={cat.name} className="flex items-center space-x-2">
                                        <RadioGroupItem className="bg-white text-green-500 accent-green-500 peer-checked:bg-green-500" value={cat.name.toLowerCase()} id={cat.name.toLowerCase()} />
                                        <Label htmlFor={cat.name.toLowerCase()} className="flex items-center cursor-pointer">
                                            <IconComponent className="h-4 w-4 mr-2" />
                                            {cat.name}
                                        </Label>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </div>
                </div>

                <DialogFooter>
                    <DialogTrigger>
                    
                    Cancel
                
                    </DialogTrigger>
                    <Button onClick={handleAddCategory} className="bg-green-500  hover:bg-green-600">
                        Add Category
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryDialog;
