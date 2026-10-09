import Sections from '../sections';
import {getChatGPTUser} from '../chatgpt-auth';
import {notFound,redirect} from 'next/navigation';
export const dynamic = "force-dynamic";
export default async function Page({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!['juegos','aprende','nosotros','foro','noticias','eventos','perfil','cuenta','recompensas'].includes(section))notFound();if(section==='perfil'&&!await getChatGPTUser())redirect('/cuenta');return <Sections section={section}/>}
