import React, { useState, useMemo, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from "axios";
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Code, BookOpen, Music, Heart, Zap, CheckCircle, Leaf, BarChart } from 'lucide-react';

const categories = [
    { name: "Coding", icon: Code },
    { name: "Study", icon: BookOpen },
    { name: "Music", icon: Music },
    { name: "Health", icon: Heart },
    { name: "Fitness", icon: Zap },
    { name: "Habit", icon: CheckCircle },
    { name: "Plant", icon: Leaf },
    { name: "Workout", icon: BarChart }
];

const allIcons = [
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
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  
    const colorRef = useRef<HTMLInputElement>(null);

    const handleAddCategory = async () => {
        try {
            const response = await axios.post("api/users/tracker", {});
            if (response.data.ok) {
                toast.success("Tracker added successfully, Try adding tasks");
            }
        } catch (error) {
            toast.error("Error occurred while Adding a Tracker!");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="hover:opacity-90 bg-green-500">
                    + Add Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg bg-black/30 backdrop-blur-md border border-white/10 rounded-xl shadow-xl text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Add Category</DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label>Tracker Name</Label>
                        <Input id="name" placeholder="Enter tracker name" className="bg-white/10 border-white/20 text-white" />
                    </div>

                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <Textarea id="description" placeholder="Enter description" className="bg-white/10 border-white/20 text-white" />
                    </div>

                    <div className="grid gap-2">
                        <Label>Icon</Label>
                      
                        <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto pr-2">
                            {allIcons.map(iconItem => {
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
                        <div className="flex items-center space-x-3">
                       
                            <input 
                                type="color" 
                                defaultValue={"#11ae70"}
                                ref={colorRef}
                                className="w-full h-10 cursor-pointer bg-transparent border-white/20"
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label>Category</Label>
                        <RadioGroup defaultValue="coding" className="grid grid-cols-2 gap-2 ">
                            {categories.map(cat => {
                                const IconComponent = cat.icon;
                                return (
                                    <div key={cat.name} className="flex items-center space-x-2">
                                        <RadioGroupItem className='bg-white text-green-500 accent-green-500 peer-checked:bg-green-500 ' value={cat.name.toLowerCase()} id={cat.name.toLowerCase()} />
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
                    <Button type="button" variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
                        Cancel
                    </Button>
                    <Button onClick={handleAddCategory} className="bg-green-500 hover:opacity-90">
                        Add Category
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddCategoryDialog;
