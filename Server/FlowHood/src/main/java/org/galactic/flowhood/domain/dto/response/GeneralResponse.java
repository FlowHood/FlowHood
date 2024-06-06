package org.galactic.flowhood.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneralResponse {
    private String message;
    private Object data;

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private HttpStatus status = HttpStatus.OK;
        private String message;
        private Object data;

        public Builder status(HttpStatus status) {
            this.status = status;
            return this;
        }

        public Builder message(String message) {
            this.message = message;
            return this;
        }

        public Builder data(Object data) {
            this.data = data;
            return this;
        }

        public ResponseEntity<GeneralResponse> getResponse() {
            return ResponseEntity
                    .status(status)
                    .body(new GeneralResponse(
                            message == null ?
                                    status.getReasonPhrase() : message,
                            data)
                    );
        }
    }
}
