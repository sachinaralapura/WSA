package Arrays;

public class PrintArray {
    public static <T> void printArray(T[] array) {
        for (T t : array) {
            System.out.println(t);
        }
        System.out.println();
    }
}
