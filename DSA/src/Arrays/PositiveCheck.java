package Arrays;
import java.util.Scanner;

public class PositiveCheck {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int i = 3;
        while (i < 3) {
            System.out.println(i + " ");
            i++;
        }

        System.out.print("Enter a number: ");
        double number = scanner.nextDouble();

        if (number > 0) {
            System.out.println("The number is positive.");
        } else if (number == 0) {
            System.out.println("The number is zero.");
        } else {
            System.out.println("The number is negative.");
        }

        scanner.close();
    }
}

 