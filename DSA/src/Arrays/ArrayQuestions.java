package src.Arrays;

import java.util.ArrayList;
import java.util.Arrays;

public class ArrayQuestions {
    public static void main(String[] args) {
        temp();
    }

    public static void printArray() {
        int[] arr = { 1, 2, 3, 4, 5 };

        // print all elements of 1d array
        for (int i : arr) {
            System.out.println(i);
        }
        // print the second element
        System.out.println(arr[1]);

        // 2D array
        int[][] twoDArray = {
                { 10, 20, 30 },
                { 40, 50, 60 },
                { 70, 80, 90 },
        };

        for (int i = 0; i < twoDArray.length; i++) {
            System.out.print("Row " + (i + 1) + " : ");
            for (int j = 0; j < twoDArray[i].length; j++)
                System.out.print(twoDArray[i][j] + " ");
            System.out.println();
        }

        // using stl
        // System.out.println(Arrays.deepToString(twoDArray));

        System.out.println(twoDArray[0][1]);

    }

    public static void Sum() {
        int arr[] = { 1, 2, 3, 4, 5 };
        System.out.println(Arrays.stream(arr).sum());
    }

    public static void Maximum() {
        int arr[] = { 1, 1, 1, 1, 1 };
        int max = Arrays.stream(arr).max().orElse(Integer.MIN_VALUE);
        System.out.println(max);
    }

    public static void temp() {
        ArrayList<String> colors = new ArrayList<String>(Arrays.asList("red", "green", "pink", "violet"));
        colors.add("purple");
        colors.remove(colors.size() - 1);
        for (String c : colors) {
            System.out.println(c);
        }
    }
}
