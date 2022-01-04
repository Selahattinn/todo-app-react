import { render, screen } from '@testing-library/react';
import { error } from 'console';
import Todo from './Todo'

test("It should have a button that says add",()=>{
    render(<Todo/>);
    const button = screen.getByText("Add");
    expect(button).toBeVisible();
});
test("It should take an input that type text",()=>{
    render(<Todo/>);
    const input = screen.getByTitle("input-text");
    expect(input.type).toBe("text");
});


test("It should take an input that palceolder is Write Your Job",()=>{
    render(<Todo/>);
    const input = screen.getByPlaceholderText("Write Your Job");
    expect(input).toBeVisible();
});

test("It should have a table",()=>{
    render(<Todo/>);
    const table = screen.getByTitle("table");
    expect(table).toBeVisible();
});

test("Table should have an ID col",()=>{
    render(<Todo/>);
    const table = screen.getByTitle("IDCol");
    expect(table).toBeVisible();
});

test("Table should have a body col",()=>{
    render(<Todo/>);
    const table = screen.getByTitle("BodyCol");
    expect(table).toBeVisible();
});

test("When writes an empty input and click add job must seen an alert",()=>{
    window.alert = jest.fn();
    render(<Todo/>);
    const button = screen.getByText("Add");
    button.click();
    expect(window.alert).toBeCalledWith('Job body cant be null');
});

test("When writes an input and click add job must seen in table ",()=>{
    throw new error()
});