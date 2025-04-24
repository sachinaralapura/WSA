package src.Arrays;

import java.util.Scanner;

public class NaturalNumbers {
    public static void main(String[] args) {
        MulTable();
    }

    public static void Sum() {
        int sum = 0;
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sum = (n * (n + 1)) / 2;
        System.out.println("Sum of first 10 natural numbers is: " + sum);
        sc.close();
    }

    public static void MulTable() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int n = scanner.nextInt();

        System.out.println("Multiplication table of " + n + ":");

        for (int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }

        scanner.close();
    }

    public static void LargeThree() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter first number: ");
        int a = scanner.nextInt();

        System.out.print("Enter second number: ");
        int b = scanner.nextInt();

        System.out.print("Enter third number: ");
        int c = scanner.nextInt();

        int largest;

        if (a >= b && a >= c) {
            largest = a;
        } else if (b >= a && b >= c) {
            largest = b;
        } else {
            largest = c;
        }

        System.out.println("The largest number is: " + largest);

        scanner.close();
    }

    public static void CheckDivisible() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int number = scanner.nextInt();

        if (number % 3 == 0 && number % 5 == 0) {
            System.out.println(number + " is divisible by both 3 and 5.");
        } else {
            System.out.println(number + " is not divisible by both 3 and 5.");
        }

        scanner.close();
    }

    public static void Factorial() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number to calculate factorial: ");
        int number = scanner.nextInt();

        long factorial = 1;

        for (int i = 1; i <= number; i++) {
            factorial *= i;
        }

        System.out.println("Factorial of " + number + " is: " + factorial);

        scanner.close();
    }
}
