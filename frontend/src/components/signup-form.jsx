import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const SignupForm = ({
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const [firstName,setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [success,setSuccess] = useState(false);
  const [error,setError] = useState("");
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-neutral-800">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John"
            required
            className="bg-background" 
            onChange={e=>{
              setFirstName(e.target.value);
            }}/>
        </Field>
        <Field>
          <FieldLabel htmlFor="name">Last Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="Doe"
            required
            className="bg-background" 
            onChange={e=>{
              setLastName(e.target.value);
            }}
            />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background" 
            onChange = {e=>{
              setUsername(e.target.value);
            }}/>
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" required className="bg-background"             
          onChange = {e=>{
              setPassword(e.target.value);
            }}/>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>

          <Button type="submit" onClick={async(e)=>{

            e.preventDefault();
            try{
              const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstName,
                lastName,
                password
              })
              console.log("Signed up Successfully");
              setSuccess(true);

              setTimeout(() => {
                setSuccess(false);
              }, 2000);

              localStorage.setItem("paytmToken", response.data.token);
              setTimeout(()=>{
                navigate("/dashboard");
              },2500);
            }catch(err){
              console.log(err.message);
              setError(err.response.data.message);
              setTimeout(() => {
                setError("");
              }, 5000);

            }
          }}>Create Account</Button>

        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <Field>

          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/signin">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
            {success && (
              <div className="fixed z-10 top-4 left-1/2 -translate-x-1/2 bg-green-500  text-white px-4 py-2 rounded-md shadow-md">
                Signup successful!
              </div>
            )}
            {error && (
              <div className="fixed z-10 top-4 left-1/2 -translate-x-1/2 bg-red-400  text-white px-4 py-2 rounded-md shadow-md">
                {error}
              </div>
            )}
    </form>
  );
}
