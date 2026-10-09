import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export function db(){if(!env.DB)throw new Error('Storage unavailable');return env.DB;}
export async function identity(){return getChatGPTUser();}
export function writeAllowed(request:Request){const origin=request.headers.get('origin');return !origin||origin===new URL(request.url).origin;}
export function unavailable(error:unknown){console.error('ITASO data error',error);return Response.json({error:'No pudimos guardar o cargar los datos. Inténtalo nuevamente.'},{status:503});}
export const avatarIds=['flor_rosa','flor_2','flor','huevo','manzana','zana'];
