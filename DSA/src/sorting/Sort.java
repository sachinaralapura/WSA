package sorting;

public abstract class Sort {
    abstract <T extends Comparable<T>> void sort(T[] array);

    public <T> void printArray(T[] array) {
        for (T t : array) {
            System.out.print(t);
            System.out.print(",");
        }
        System.out.println();
    }
}