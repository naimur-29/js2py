#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

size_t file_size(FILE *file) {
    if (!file) return 0;

    fpos_t origin = 0;
    if (fgetpos(file, &origin) != 0) {
        printf("fgetpos() failed: %i\n", errno);
        return 0;
    }

    fseek(file, 0, SEEK_END);
    long out = ftell(file);

    if (fsetpos(file, &origin) != 0) {
        printf("fgetpos() failed: %i\n", errno);
    }


    return out;
}

char *file_contents(char *path) {
    FILE *file = fopen(path, "r");

    if (!file) {
        printf("Couldn't open file at %s\n", path);
        return NULL;
    }

    long size = file_size(file);
    char *contents = malloc(size + 1);
    char *write_it = contents;
    size_t bytes_read = 0;
    while(bytes_read < size) {
        size_t bytes_read_current_iteration = fread(write_it, 1, size - bytes_read, file);
        if (ferror(file)) {
            printf("Error while reading: %i\n", errno);
            return NULL;
        }

        bytes_read += bytes_read_current_iteration;
        write_it += bytes_read_current_iteration;

        if (feof(file)) {
            break;
        }
    }
    contents[bytes_read] = '\0';

    return contents;
}

void print_usage(char **argv) {
    printf("USAGE: %s <path_to_file_to_compile>\n", argv[0]);
}

int main(int argc, char **argv) {
    if (argc < 2) {
        print_usage(argv);
        exit(0);
    }

    char *path = argv[1];
    char *contents = file_contents(path);

    printf("Contents of %s:\n---\n\"%s\"\n---\n", path, contents);
    free(contents);

    return 0;
}