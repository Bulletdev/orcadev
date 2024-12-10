import { 
    Controller, 
    Get, 
    Post, 
    Put, 
    Delete, 
    Body, 
    Param, 
    UseGuards 
  } from '@nestjs/common';
  import { ProjectsService } from './projects.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../common/guards/roles.guard';
  import { Roles } from '../common/decorators/roles.decorator';
  
  @Controller('projects')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}
  
    @Post()
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    async createProject(@Body() projectData: CreateProjectDto) {
      return this.projectsService.create(projectData);
    }
  
    @Get()
    async listProjects() {
      return this.projectsService.findAll();
    }
  
    @Get(':id')
    async getProject(@Param('id') id: string) {
      return this.projectsService.findById(id);
    }
  
    @Put(':id')
    @Roles(UserRole.ADMIN, UserRole.MANAGER)
    async updateProject(
      @Param('id') id: string, 
      @Body() projectData: UpdateProjectDto
    ) {
      return this.projectsService.update(id, projectData);
    }
  
    @Delete(':id')
    @Roles(UserRole.ADMIN)
    async deleteProject(@Param('id') id: string) {
      return this.projectsService.delete(id);
    }
  }