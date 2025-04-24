package src.sorting;

public class Main {
    public static void main(String[] args) {

        Sort sortMethod = new InsertionSort();

        Integer[] intArray = { 5, 3, 8, 4, 2, 1, 10, 11, 7 };
        String[] strArray = { "Banana", "Apple", "Mango", "Cherry" };

        System.out.println("Before sorting:");
        sortMethod.printArray(intArray);
        sortMethod.printArray(strArray);

        sortMethod.sort(intArray);
        sortMethod.sort(strArray);

        System.out.println("\nAfter sorting:");
        sortMethod.printArray(intArray);
        sortMethod.printArray(strArray);
    }
}
