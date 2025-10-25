"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

const TestButton = () => {
    return (
        <Button onClick={()=> toast.info("You're inside dev🟩", {description: "Good hack time!"})}>
          Click
        </Button>
    );
};

export default TestButton;