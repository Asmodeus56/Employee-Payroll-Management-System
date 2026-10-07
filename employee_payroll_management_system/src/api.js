import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Store mock session in memory for the hardcoded accounts
let mockSession = null;

export const signInUser = async (email, password) => {
    // Intercept hardcoded test accounts
    if (email === 'hr@epnexus.com' && password === 'password') {
        await delay(800);
        const user = { id: 'hr-mock-id', email: 'hr@epnexus.com', role: 'HR' };
        mockSession = { user };
        return user;
    }
    if (email === 'employee@epnexus.com' && password === 'password') {
        await delay(800);
        const user = { id: 'emp-mock-id', email: 'employee@epnexus.com', role: 'Employee' };
        mockSession = { user };
        return user;
    }

    if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data.user;
    } else {
        throw new Error('Invalid login credentials. Please use the provided test accounts.');
    }
};

export const signOutUser = async () => {
    if (mockSession) {
        await delay(500);
        mockSession = null;
        return;
    }
    if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }
};

export const getSession = async () => {
    if (mockSession) return mockSession;
    
    if (supabase) {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    }
    return null;
};

export const createEmployee = async (employeeData) => {
    if (supabase && !mockSession) {
        const { data, error } = await supabase
            .from('Employees')
            .insert([employeeData]);
        if (error) throw error;
        return data;
    } else {
        await delay(1200);
        console.log('Mock: Employee created', employeeData);
        return { ...employeeData, id: Math.floor(Math.random() * 1000) };
    }
};

export const runPayrollBatch = async () => {
    if (supabase && !mockSession) {
        const { data, error } = await supabase.rpc('process_payroll_batch');
        if (error) throw error;
        return data;
    } else {
        await delay(2500);
        console.log('Mock: Payroll batch processed successfully');
        return { status: 'success', processed: 42, totalAmount: 215000 };
    }
};