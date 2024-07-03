package org.galactic.flowhood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class FlowHoodApplication {

	public static void main(String[] args) {
		SpringApplication.run(FlowHoodApplication.class, args);
	}

}
