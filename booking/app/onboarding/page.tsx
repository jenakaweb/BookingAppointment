import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function OnboardingRoute(){
    return(
        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome to <span className="text-blue-500"> NAINU </span> </CardTitle>
                    <CardDescription> We need the following to setup your profile</CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}