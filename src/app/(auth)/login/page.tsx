import { LoginForm } from "@ui/data/login";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@components/tabs';
import ThemeToggler from "@ui/theme/ThemeToggler";
import { RegisterForm } from "@ui/data/register";

export default function LoginPage() {
  return (
    <div className='h-full md:max-h-md lg:max-h-lg xl:max-h-4xl mt-2 overflow-auto flex items-center justify-center relative'>
      <div className='absolute bottom-5 right-0'>
        <ThemeToggler />
      </div>
      <Tabs defaultValue='login' className='w-[500px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='register'>Register</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <LoginForm />
        </TabsContent>
        <TabsContent value='register'>
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
