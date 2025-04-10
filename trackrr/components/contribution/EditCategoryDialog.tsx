"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from "axios";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Code, BookOpen, Music, Heart, Zap, CheckCircle, Leaf, BarChart, Edit } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Category } from '@/helpers/db/category';

// Reuse the same category and icon definitions from the AddCategoryDialog
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

interface EditCategoryDialogProps {
    category: Category;
    onEditComplete?: () => void;
}

const EditCategoryDialog = ({ category, onEditComplete }: EditCategoryDialogProps) => {
    const { data: session } = useSession();
    const [categoryName, setCategoryName] = useState<string>(category.category_name);
    const [categoryType, setCategoryType] = useState<string>(category.category_type);
    const [description, setDescription] = useState<string>(category.description || "");
    const [selectedIcon, setSelectedIcon] = useState<string | undefined>(category.icon_name);
    const colorRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Update form when category prop changes
        setCategoryName(category.category_name);
        setCategoryType(category.category_type);
        setDescription(category.description || "");
        setSelectedIcon(category.icon_name);
        
        // This effect will run when the dialog opens
        if (open && colorRef.current) {
            colorRef.current.value = category.color;
        }
    }, [category, open]);

    const handleUpdateCategory = async () => {
        if (!categoryName || !description || !selectedIcon || !categoryType) {
            toast.error("Please fill all required fields.");
            return;
        }

        try {
            const dataToUpdate = {
                c_id: category.c_id,
                u_id: session?.user.id as string,
                category_name: categoryName,
                icon_name: selectedIcon,
                category_type: categoryType,
                description: description,
                color: colorRef.current?.value || category.color,
            };

            const response = await axios.patch(`/api/category?u_id=${session?.user.id}&c_id=${category.c_id}`, dataToUpdate);

            if (response.status === 200) {
                setOpen(false);
                toast.success("Category updated successfully!");
                
                if (onEditComplete) {
                    onEditComplete();
                }
                window.location.reload();
            } else {
                toast.error("Failed to update category. Please try again.");
            }
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error("Error occurred while updating the category.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="icon" className="text-gray-400 cursor-pointer hover:text-white flex items-center justify-center">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%] max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] md:max-h-[100vh] overflow-y-auto  
    bg-black/70 md:bg-black/30 sm:bg-black border border-white/10 rounded-xl shadow-xl text-white">

                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Edit Category</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Habit Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter Habit name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
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
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-40 overflow-y-auto pr-2">
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
                            defaultValue={category.color}
                            ref={colorRef}
                            className="w-full h-10 cursor-pointer bg-transparent border-white/20"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label>Category</Label>
                        <RadioGroup
                            className="grid grid-cols-2 gap-2"
                            value={categoryType}
                            onValueChange={(value) => setCategoryType(value)}
                        >
                            {categories.map((cat) => {
                                const IconComponent = cat.icon;
                                return (
                                    <div key={cat.name} className="flex items-center space-x-2">
                                        <RadioGroupItem 
                                            className="bg-white text-green-500 accent-green-500 peer-checked:bg-green-500" 
                                            value={cat.name.toLowerCase()} 
                                            id={`edit-${cat.name.toLowerCase()}`} 
                                        />
                                        <Label htmlFor={`edit-${cat.name.toLowerCase()}`} className="flex items-center cursor-pointer">
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
                    <Button variant="default" onClick={() => setOpen(false)} className="border-white/20 text-white hover:bg-white/10">
                        Cancel
                    </Button>
                    <Button variant={"default"} onClick={handleUpdateCategory} className="bg-green-500 hover:opacity-90">
                        Update Category
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditCategoryDialog;